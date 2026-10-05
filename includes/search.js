// URLから検索キーワードを取得
const params = new URLSearchParams(window.location.search);
const keywordParam = params.get("keyword");

// 検索キーワードをスペースで分割
const keywords = keywordParam 
    ? keywordParam.split(/\s+/).filter(keyword => keyword.length > 0) : [];

// 検索キーワードを画面に表示
const searchKeyword = document.getElementById("searchKeyword");
searchKeyword.textContent = `「${keywordParam}」の検索結果`;

// 検索対象ページの指定
async function getPages() {
    // sitemap.xmlを取得
    const response = await fetch(`${baseUrl}sitemap.xml`);
    // XMLを文字列として取得
    const xml = await response.text();
    // XMLを解析
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "application/xml");
    // <loc>をすべて取得
    const urlElements = doc.querySelectorAll("url");

    // ページ一覧を格納
    const pages = [];

    // <loc>を1つずつ処理
    urlElements.forEach(urlElement => {
        // URLを取得
        const loc = urlElement.querySelector("loc");
        // titleを取得
        const title = urlElement.querySelector("title");
        // 相対パスを実際のURLへ変換
        const url = new URL(
            loc.textContent.trim(),
            baseUrl
        ).href;

        // ページ情報を保存
        pages.push({
            title: title.textContent.trim(),
            url: url
        });
    });
    return pages;
}

// html内のtextを取得し、keywordと一致するか確認するメソッド
async function searchPages() {
    const pages = await getPages();
    
    // 結果を格納する変数
    const results = [];

    // 検索対象ページのurlを取得
    for (const page of pages) {
        // htmlのurlを取得
        const response = await fetch(page.url);
        // htmlを文字列で取得
        const html = await response.text();
        // 文字列をhtmlとして解析
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        
        // 検索対象のタグを設定
        const elements = doc.querySelectorAll(
            ".container h1, .container h2, .container h3, .container h4, .container h5, .container h6, .container p, .container li"
        );

        elements.forEach((element, elementIndex) => {
            // タグ内の文章を取得(複数スペースは一文字スペースへtrim)
            const text = element.textContent.replace(/\s+/g, " ").trim();

            // タグなし(余計なスペースや改行文字など)は無視
            if (!text) {
                return;
            }

            // タグに該当したキーワードを保存
            const matchedKeywords = [];
            for (const keyword of keywords) {
                if(text.toLowerCase().includes(keyword.toLowerCase())) {
                    matchedKeywords.push(keyword);
                }
            }

            // 1つ以上のキーワードが該当した場合
            if (matchedKeywords.length > 0) {

                // 最初に見つけたキーワードの位置
                const index = text
                    .toLowerCase()
                    .indexOf(matchedKeywords[0].toLowerCase());

                // 前後五文字を取得
                const start = Math.max(0, index - 15);
                const end = Math.min(
                    text.length,
                    index + matchedKeywords[0].length + 15
                );

                const excerpt = text.substring(start, end);

                // 検索結果に追加
                results.push({
                    ...page,
                    excerpt: excerpt,
                    keywords: matchedKeywords,
                    elementIndex: elementIndex
                });   
            }
        });
    }
    return results;
}

// searchPagesを呼び出し、検索結果を表示
searchPages().then(results => {
    const searchResults = document.getElementById("searchResults");

    // 検索結果がない場合
    if (results.length === 0) {
        searchResults.textContent = "該当するページはありません。";
        return;
    }

    // 検索結果を1件づつ表示
    results.forEach(resultData => {
        // エレメントを作成
        const result = document.createElement("div");
        result.classList.add("site-element");

        // 該当キーワード
        const keywordText = document.createElement("p");
        keywordText.textContent = `該当：${resultData.keywords.join(" / ")}`;
        result.appendChild(keywordText);

        // 検索結果へのリンク
        const link = document.createElement("a");
        link.href = `${resultData.url}?keyword=${encodeURIComponent(keywordParam)}#search-${resultData.elementIndex}`;
        link.textContent = resultData.excerpt;
        result.appendChild(link);

        // ページタイトルを追加
        const linkTitle = document.createElement("p");
        linkTitle.classList.add("site-ttl");
        linkTitle.textContent = resultData.title;
        result.appendChild(linkTitle);

        // 検索結果に追加
        searchResults.appendChild(result);
    });
});