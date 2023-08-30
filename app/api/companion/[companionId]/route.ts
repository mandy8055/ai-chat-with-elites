import prismaDB from '@/lib/prismadb';
import { currentUser } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function PATCH(
  req: Request,
  { params }: { params: { companionId: string } },
) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const { src, instructions, name, description, seed, categoryId } = body;

    if (!params.companionId) {
      return new NextResponse('Bad Request', { status: 400 });
    }

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
    // TODO: Check for subscription

    const companion = await prismaDB.companion.update({
      where: {
        id: params.companionId,
      },
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
    console.log('COMPANION_PATCH', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
