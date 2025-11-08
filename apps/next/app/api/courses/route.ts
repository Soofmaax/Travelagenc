import { NextRequest } from 'next/server';
import { z } from 'zod';
import { db } from '../../../lib/db';
import { courses } from '../../../db/schema';
import { eq } from 'drizzle-orm';

const createCourseSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  price: z.number().int().nonnegative().optional(),
  published: z.boolean().optional(),
});

const updateCourseSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  price: z.number().int().nonnegative().optional(),
  published: z.boolean().optional(),
});

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = createCourseSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const [created] = await db
    .insert(courses)
    .values({
      title: parsed.data.title,
      description: parsed.data.description ?? null,
      price: parsed.data.price ?? null,
      published: parsed.data.published ?? false,
    })
    .returning();

  return Response.json({ course: created }, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = updateCourseSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { id, ...rest } = parsed.data;

  const [updated] = await db
    .update(courses)
    .set({
      ...(rest.title !== undefined ? { title: rest.title } : {}),
      ...(rest.description !== undefined ? { description: rest.description } : {}),
      ...(rest.price !== undefined ? { price: rest.price } : {}),
      ...(rest.published !== undefined ? { published: rest.published } : {}),
      updatedAt: new Date(),
    })
    .where(eq(courses.id, id))
    .returning();

  if (!updated) {
    return Response.json({ error: 'Course not found' }, { status: 404 });
  }

  return Response.json({ course: updated }, { status: 200 });
}