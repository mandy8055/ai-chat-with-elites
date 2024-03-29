import prismaDB from '@/lib/prismadb';
import { checkSubscription } from '@/lib/subscription';
import { auth, currentUser } from '@clerk/nextjs';
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
    const isPro = await checkSubscription();

    if (!isPro) {
      return new NextResponse('Pro subscription is required', { status: 403 });
    }

    const companion = await prismaDB.companion.update({
      where: {
        id: params.companionId,
        userId: user.id,
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

export async function DELETE(
  req: Request,
  { params }: { params: { companionId: string } },
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const companion = await prismaDB.companion.delete({
      where: {
        userId,
        id: params.companionId,
      },
    });

    return NextResponse.json(companion);
  } catch (error) {
    console.log('COMPANION_DELETE', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
