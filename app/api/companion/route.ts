import prismaDB from '@/lib/prismadb';
import { checkSubscription } from '@/lib/subscription';
import { currentUser } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const { src, instructions, name, description, seed, categoryId } = body;

    if (!user || !user.id || !user.firstName) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    if (
      !src ||
      !instructions ||
      !name ||
      !description ||
      !seed ||
      !categoryId
    ) {
      return new NextResponse('Bad Request', { status: 400 });
    }
    const isPro = await checkSubscription();

    if (!isPro) {
      return new NextResponse('Pro subscription is required', { status: 403 });
    }

    const companion = await prismaDB.companion.create({
      data: {
        src,
        instructions,
        name,
        description,
        seed,
        categoryId,
        userId: user.id,
        userName: user.firstName,
      },
    });

    return NextResponse.json(companion);
  } catch (error) {
    console.log('COMPANION_POST', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
