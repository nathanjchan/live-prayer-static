interface ChannelInfo {
	[key: string]: {
		is_live: boolean;
		title: string;
	};
}

function does_html_contain_live_indicator(html: string): boolean {
	return html.indexOf(`"text":" watching"`) !== -1;
}

function get_title_from_html(html: string): string {
	const title_indicator = 'pageTitle":"';
	const start_index = html.indexOf(title_indicator);
  if (start_index === -1) {
    new Error('Start of title not found');
  }
  console.log(start_index);
  const end_index = html.indexOf('"', start_index + title_indicator.length);
  if (end_index === -1) {
    new Error('End of title not found');
  }
  console.log(end_index);
  const title = html.substring(start_index + title_indicator.length, end_index);
  console.log(title);
  return title;
}

async function get_channel_info(channel_id: string): Promise<ChannelInfo> {
	const url = `https://youtube.com/@${channel_id}`;
	return await fetch(url).then(async (response) => {
		if (response.status !== 200) {
			throw new Error(`Failed to fetch ${url} with status ${response.status}.`);
		}
		const text = await response.text();
		const is_live = does_html_contain_live_indicator(text);
		const title = get_title_from_html(text);
		return {
			[channel_id]: {
				is_live,
				title
			}
		};
	});
}

export default get_channel_info;
