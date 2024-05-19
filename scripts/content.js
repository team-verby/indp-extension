let playlistData = [];

let playlistElements = document.querySelectorAll("#contents > ytmusic-playlist-shelf-renderer > #contents > ytmusic-responsive-list-item-renderer");

// 플레이 리스트 독자
let playlistTitle = document.querySelector("#header > ytmusic-detail-header-renderer > div > div.metadata.style-scope.ytmusic-detail-header-renderer > h2 > yt-formatted-string > span")
if (playlistTitle == null) {
    // 플레이 리스트 작성자
    playlistTitle = document.querySelector("#header > ytmusic-editable-playlist-detail-header-renderer > ytmusic-detail-header-renderer > div > div.metadata.style-scope.ytmusic-detail-header-renderer > h2 > yt-formatted-string > span")
}
playlistTitle = playlistTitle.innerText.trim()

let minute = 0
let second = 0
playlistElements.forEach(element => {
    let title = element.querySelector('yt-formatted-string.title').innerText.trim();
    let artist = element.querySelector('yt-formatted-string.flex-column a').innerText.trim();
    let duration = element.querySelector('yt-formatted-string.fixed-column').innerText.trim();

    minute += Number(duration.split(":")[0])
    second += Number(duration.split(":")[1])

    playlistData.push({
        "title": title,
        "artist": artist,
        "duration": duration
    });
});

let totalDuration = minute + Math.floor(second / 60) + ":" + second % 60

// CSV 헤더 생성
const csvHeader = ['제목', '가수', '길이'].join(',');

// CSV 데이터 생성
const csvContent = playlistData.map(item => [
    `"${item.title.replace(/"/g, '""')}"`,
    `"${item.artist.replace(/"/g, '""')}"`,
    `"${item.duration.replace(/"/g, '""')}"`
].join(',')).join('\n') + '\n,,' + totalDuration;

// CSV 데이터를 Blob으로 변환
const blob = new Blob(["\ufeff", csvHeader + '\n' + csvContent], { type: 'text/csv;charset=utf-8;' }); // \ufeff 추가 (BOM)

// Blob을 URL로 변환
const url = URL.createObjectURL(blob);

// 다운로드 링크 생성
const link = document.createElement('a');
link.setAttribute('href', url);
link.setAttribute('download', `${playlistTitle}.csv`);
link.style.visibility = 'hidden';

// 다운로드 링크를 문서에 추가하고 클릭하여 다운로드
document.body.appendChild(link);
link.click();
document.body.removeChild(link);
  