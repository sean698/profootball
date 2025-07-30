import { redirect } from 'next/navigation';

export default function ExternalPage({ params }) {
  const { url } = params;

  let decodedUrl;
  try {
    decodedUrl = decodeURIComponent(url);
  } catch {
    decodedUrl = '/';
  }

  if (!decodedUrl.startsWith('http')) {
    decodedUrl = `https://${decodedUrl}`;
  }

  redirect(decodedUrl);
}