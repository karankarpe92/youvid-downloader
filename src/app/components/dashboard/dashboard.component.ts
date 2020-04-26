import { Component, OnInit } from "@angular/core";
import { HttpService } from "src/app/services/http.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormGroup, FormControl } from "@angular/forms";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  faCircleNotch = faCircleNotch;
  loader: boolean = false;
  private totalCounts: {
    confirmed: number;
    recovered: number;
    critical: number;
    deaths: number;
  } = {
    confirmed: 0,
    recovered: 0,
    critical: 0,
    deaths: 0,
  };
  profileForm = new FormGroup({
    videoUrl: new FormControl(""),
    videoType: new FormControl(""),
  });

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {}

  downloadVideo() {
    let videoUrl = this.profileForm.controls.videoUrl.value;
    let videoType = this.profileForm.controls.videoType.value;
    videoUrl = youtube_parser(videoUrl);
    if (videoUrl) {
      this.loader = true;
      let headers = {
        headers: new HttpHeaders({
          "x-rapidapi-host": "download-video-youtube1.p.rapidapi.com",
          "x-rapidapi-key":
            "7fba68f20bmsh644db43347c2ef4p1ff20fjsn511aabdd4605",
        }),
      };
      this.httpClient
        .get(
          "https://download-video-youtube1.p.rapidapi.com/redir.php?video_id=" +
            videoUrl +
            "&format=" +
            videoType,
          headers
        )
        .subscribe((videoModel: VideoModel) => {
          try {
            if (videoModel && videoModel.vidInfo[0]) {
              window.location.href = videoModel.vidInfo[0].dloadUrl;
              this.loader = false;
            }
          } catch (ex) {
            console.error(ex);
          }
        });
    } else {
      alert("Video URL is incorrect");
    }

    function youtube_parser(url: string) {
      var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
      var match = url.match(regExp);
      return match && match[7].length == 11 ? match[7] : false;
    }
  }
}

export class VideoModel {
  vidID: string = "";
  vidTitle: string = "";
  vidThumb: string = "";
  duration: number = 0;
  vidInfo: VideoDownloadModel[] = [];
}

export class VideoDownloadModel {
  dloadUrl: string = "";
  bitrate: number = 0;
  mp3size: string = "";
}
