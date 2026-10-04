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

    for (const keyword of keywords) {

        if (!keyword) {
            continue;
        }

        // 検索文字を正規表現で安全に使えるようにする
        const escapedKeyword =
            keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

        const regex =
            new RegExp(escapedKeyword, "gi");

        const walker =
            document.createTreeWalker(
                element,
                NodeFilter.SHOW_TEXT
            );

        const textNodes = [];

        while (walker.nextNode()) {
            textNodes.push(walker.currentNode);
        }

        for (const textNode of textNodes) {

            const text = textNode.nodeValue;

            // キーワードがなければ次へ
            if (!regex.test(text)) {
                continue;
            }

            // test()で使った位置をリセット
            regex.lastIndex = 0;

            const fragment =
                document.createDocumentFragment();

            let lastIndex = 0;
            let match;

            while ((match = regex.exec(text)) !== null) {

                // キーワードより前の文字
                fragment.appendChild(
                    document.createTextNode(
                        text.slice(lastIndex, match.index)
                    )
                );

                // キーワード部分
                const mark =
                    document.createElement("mark");

                mark.textContent = match[0];

                fragment.appendChild(mark);

                lastIndex =
                    match.index + match[0].length;
            }

            // キーワードより後ろの文字
            fragment.appendChild(
                document.createTextNode(
                    text.slice(lastIndex)
                )
            );

            textNode.parentNode.replaceChild(
                fragment,
                textNode
            );
        }
    }
}