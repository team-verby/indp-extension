var playlistData = [];

var playlistElements = document.querySelectorAll("#contents > ytmusic-playlist-shelf-renderer > #contents > ytmusic-responsive-list-item-renderer");

// 플레이 리스트 독자
var playlistTitle = document.querySelector("#contents > ytmusic-responsive-header-renderer > h2 > yt-formatted-string")
if (playlistTitle == null) {
    // 플레이 리스트 작성자
    playlistTitle = document.querySelector("#contents > ytmusic-editable-playlist-detail-header-renderer > ytmusic-responsive-header-renderer > h2 > yt-formatted-string")
}
playlistTitle = playlistTitle.innerText.trim()

var minute = 0
var second = 0
playlistElements.forEach(element => {
    var title = element.querySelector('yt-formatted-string.title').innerText.trim();
    var artist = element.querySelector('yt-formatted-string.flex-column').innerText.trim();
    var duration = element.querySelector('yt-formatted-string.fixed-column').innerText.trim();

    minute += Number(duration.split(":")[0])
    second += Number(duration.split(":")[1])

    playlistData.push({
        "title": title,
        "artist": artist,
        "duration": duration
    });
});

var totalDuration = minute + Math.floor(second / 60) + ":" + second % 60

// CSV 헤더 생성
var csvHeader = ['제목', '가수', '길이'].join(',');

// CSV 데이터 생성
var csvContent = playlistData.map(item => [
    `"${item.title.replace(/"/g, '""')}"`,
    `"${item.artist.replace(/"/g, '""')}"`,
    `"${item.duration.replace(/"/g, '""')}"`
].join(',')).join('\n') + '\n,,' + totalDuration;

// CSV 데이터를 Blob으로 변환
var blob = new Blob(["\ufeff", csvHeader + '\n' + csvContent], { type: 'text/csv;charset=utf-8;' }); // \ufeff 추가 (BOM)

// Blob을 URL로 변환
var url = URL.createObjectURL(blob);

// 다운로드 링크 생성
var link = document.createElement('a');
link.setAttribute('href', url);
link.setAttribute('download', `${playlistTitle}.csv`);
link.style.visibility = 'hidden';

// 다운로드 링크를 문서에 추가하고 클릭하여 다운로드
document.body.appendChild(link);
link.click();
document.body.removeChild(link);
  