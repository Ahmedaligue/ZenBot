import fetch from 'node-fetch';

export async function ytSearch(query) {
  try {
    const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      }
    });

    const text = await res.text();
    const data = text.split('var ytInitialData = ')[1]?.split(';</script>')[0];
    if (!data) return [];

    const json = JSON.parse(data);
    const contents = json.contents
      ?.twoColumnSearchResultsRenderer
      ?.primaryContents
      ?.sectionListRenderer
      ?.contents[0]
      ?.itemSectionRenderer
      ?.contents || [];

    const results = [];

    for (let item of contents) {
      const video = item.videoRenderer;
      if (!video) continue;

      results.push({
        title: video.title.runs[0].text,
        url: 'https://www.youtube.com/watch?v=' + video.videoId,
        duration: video.lengthText?.simpleText || 'Live',
        thumbnail: video.thumbnail.thumbnails.pop().url,
        channel: video.ownerText?.runs[0]?.text || 'Unknown',
      });

      if (results.length >= 10) break;
    }

    return results;
  } catch (e) {
    console.error('Error en ytSearch:', e);
    return [];
  }
}