import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/Lib/supabaseClient';

// Validaciones básicas
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function sanitizeInput(input: string): string {
  return input.trim().slice(0, 255);
}

function validateDate(dateStr: string): boolean {
  const date = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date >= today && date <= new Date(Date.now() + 90 * 24 * 60 * 60 * 1000); // máximo 90 días
}

function validateTime(timeStr: string): boolean {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours >= 18 && hours <= 23 && minutes >= 0 && minutes <= 59;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validar campos requeridos
    if (!body.name || !body.email || !body.date || !body.time || !body.guests) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    // Validar email
    if (!validateEmail(body.email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }

    // Validar fecha
    if (!validateDate(body.date)) {
      return NextResponse.json(
        { error: 'Fecha inválida o fuera de rango' },
        { status: 400 }
      );
    }

    // Validar hora
    if (!validateTime(body.time)) {
      return NextResponse.json(
        { error: 'Hora inválida. El restaurante abre a las 18:00' },
        { status: 400 }
      );
    }

    // Validar número de personas
    const guests = parseInt(body.guests);
    if (isNaN(guests) || guests < 1 || guests > 20) {
      return NextResponse.json(
        { error: 'Número de personas debe estar entre 1 y 20' },
        { status: 400 }
      );
    }

    // Sanitizar inputs
    const reservationData = {
      name: sanitizeInput(body.name),
      email: sanitizeInput(body.email),
      phone: body.phone ? sanitizeInput(body.phone) : null,
      reservation_date: body.date,
      reservation_time: body.time,
      guest_count: guests,
      special_message: body.message ? sanitizeInput(body.message) : null,
      status: 'pending' as const,
    };

    // Insertar en Supabase
    const { data, error } = await supabase
      .from('reservations')
      .insert([reservationData])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Error al procesar la reserva. Intenta nuevamente.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: 'Reserva creada exitosamente',
        reservation: data,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}