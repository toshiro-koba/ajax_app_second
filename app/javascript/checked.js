function check() {
  const posts = document.querySelectorAll(".post");  //クリックされる部分の要素たちを取得！
  posts.forEach(function (post) {   //繰り返し処理を記述！！
    if (post.getAttribute("data-load") != null) { //重複したイベント発火を回避するぜ！！
      return null;
    }
    post.setAttribute("data-load", "true");
    post.addEventListener("click", () => {  //クリックした時に動作する処理を記述！！
      const postId = post.getAttribute("data-id"); //どの投稿なのかidを取得！！
      const XHR = new XMLHttpRequest(); //そして俺はXMHttpRequestを使って非同期でHTTPリクエストをするぜ！
      XHR.open("GET", `/posts/${postId}`, true); //さらに！リクエストをどのように送るか指定するぜ！
      XHR.responseType = "json"; //まだ俺のターンは終わってないぜ！レスポンスの形式を指定するぜ！
      XHR.send(); //リクエストを送信して、ターンエンド！！


      // ここからレスポンスがあった場合の処理を記述するぜ！！
      XHR.onload = () => {
        if (XHR.status != 200) { //レスポンスがエラーの場合に、アラートを表示するぜ！！
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
          return null;          
        }
        const item = XHR.response.post; //checkアクションで返却された投稿を定義するぜ！！
        if (item.checked === true) { //そして、投稿が既読かどうかを判断するぜ！！
          post.setAttribute("data-check", "true"); //既読だった場合はdata-check属性にtrueをセットするぜ！！
        } else if (item.checked === false) {
          post.removeAttribute("data-check"); //未読だった場合はdata-check属性ごと削除するぜ！！
        }
      };
    });
  });
}
setInterval(check, 1000); //1000msごとに実行するぜ！！