import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from 'openai';
import data from '@/dummy/db.json';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

const productos = data


export async function POST(request: NextRequest) {
  
  try {
    const body = await request.json();
    const { query } = body;

    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json(
        { error: "No se proporcionaron datos" },
        { status: 400 }
      );
    }


    const prompt = `
  Eres un asistente que recomienda productos. Analiza esta solicitud: "${query}"
  Y selecciona los 5 productos más relevantes del siguiente JSON. Devuelve una respuesta amigable al usuario explicando por qué esos productos son recomendados, y también un array llamado "sugerencias" con los objetos completos recomendados.
  
  JSON de productos:
  ${JSON.stringify(productos)}
  
  Responde en este formato:
  {
    "mensaje": "Explicación para el usuario",
    "sugerencias": [ ...productos relevantes ]
  }

  No regeses texto adicional al que se solicita, solo la respuesta en el formato especificado.
   si no encuentas ningun producto, responde con el mismo objeto pero en sugerencias manda un array vacio.
  `;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const textResponse = response.choices[0].message.content;
    console.log(textResponse);
    const data = JSON.parse(textResponse || "");
    return NextResponse.json(
      {
        message: "Datos recibidos correctamente",
        data: data
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en la API:", error);

    return NextResponse.json(
      { error: "Error al procesar la solicitud" },
      { status: 500 }
    );
  }

}
