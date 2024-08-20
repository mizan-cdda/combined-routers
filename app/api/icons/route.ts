import { NextResponse } from 'next/server';
import { allIcons } from './iconJson';

const icons = allIcons;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query') || '';
    const searchQuery = query.toString().toLowerCase();
    const filteredIcons = await filterIcons(searchQuery);
    return NextResponse.json({ icons: filteredIcons });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

async function filterIcons(query: string) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return icons.filter((icon: string) => icon.toLowerCase().includes(query));
}
