// URLの#以降を取得
const hash = window.location.hash;

// #search-xxの場合だけ処理する
if (hash.startsWith("#search-")) {
    // [search-]の後ろの数字を取得
    const elementIndex = Number(
        hash.replace("#search-", "")
    );

    // 検索対象のタグを取得
    const elements = document.querySelectorAll(
        ".container h1, .container h2, .container h3, .container h4, .container h5, .container h6, .container p, .container li"
    );

    // 該当する要素を取得
    const target = elements[elementIndex];

    // 該当する要素が存在する場合
    if (target) {

        // その場所までスクロール
        target.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        // 検索キーワードを取得
        const params = new URLSearchParams(
            window.location.search
        );

        const keywordParam = params.get("keyword");

        // キーワードをスペースで分割
        const keywords = keywordParam ? keywordParam.split(/\s+/) : [];
        // キーワードをハイライト
        highlightKeywords(target, keywords);
    }
}

// キーワードをハイライトするメソッド
function highlightKeywords(element, keywords) {

    let html = element.innerHTML;

    for(const keyword of keywords) {
        if(!keyword) {
            continue;
        }

        const escapedKeyword = 
            keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

        const regex = new RegExp(
            `(${escapedKeyword})`,
            "gi"
        );

        html = html.replace(
            regex,
            "<mark>$1</mark>"
        );
    }

    element.innerHTML = html;
}