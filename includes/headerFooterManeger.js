// 現在のサイトのルートURLを取得
//ローカル環境
const basePath = "/";
//実行環境
//const basePath = "/KamekaBlog/";

const baseUrl = `${window.location.origin}${basePath}`;

class SpecialHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <header class="header w_inner">
                <div class="logo">
                    <img src="${baseUrl}img/logo.svg" alt="KamekaBlog_logo">
                    <h1>KamekaBlog</h1>
                </div>
            </header>
            <nav class="w_inner">
                <ul>
                    <li><a class="nav-link" href="${baseUrl}index.html">Home</a></li>
                    <li><a class="nav-link" href="${baseUrl}portfolio.html">Portfolio</a></li>
                    <li><a class="nav-link" href="${baseUrl}study.html">Study</a></li>
                    <li><a class="nav-link" href="${baseUrl}profile.html">Profile</a></li>
                    <li><a class="nav-link" href="${baseUrl}contact.html">Contact</a></li>
                </ul>
            </nav>
        `;
    }
}

class SpecialFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <footer class="footer">
                <div class="copy">
                    <p>&copy; 2024 KamekaBlog. All rights reserved.</p>
                </div>
            </footer>
        `
    }
}

customElements.define("special-header", SpecialHeader)
customElements.define("special-footer", SpecialFooter)

//current pageのcssを付与
document.querySelectorAll('.nav-link').forEach(link => {
    let currentPath = window.location.pathname;
    
    // ルートパス (`/`) の場合は `index.html` として処理
    if (currentPath === `${basePath}`) {
        currentPath = `${basePath}index.html`;
    }
    
    //.nav-linkのpathnameと現在のパスが一致していたらclassにcurrentを付与
    if (link.pathname === currentPath) {
        link.classList.add('current');
    }
});


// `study_contents` 内のページなら、study.html のリンクを探して `current` を付ける

if (window.location.pathname.startsWith(`${basePath}study_contents/`)) {
    document.querySelectorAll('.nav-link').forEach(nav => {
        if (nav.href.endsWith('study.html')) {
            nav.classList.add('current');
        }
    });
}

