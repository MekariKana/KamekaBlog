//基礎知識のタイトル挿入
class BasicKnowledgeTitle extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="content_ttl">
                <h3>基礎知識</h3>
            </div>
        `
    }
}

//HTML_CSSのタイトル挿入
class HtmlCssTitle extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="content_ttl">
                <h3>HTML/css</h3>
            </div>
        `
    }
}

//Javaのタイトル挿入
class JavaTitle extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="content_ttl">
                <h3>Java</h3>
            </div>
        `
    }
}

//Javascriptのタイトル挿入
class JavascriptTitle extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="content_ttl">
                <h3>JavaScript</h3>
            </div>
        `
    }
}

//情報Iのタイトル挿入
class InformationTitle extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="content_ttl">
                <h3>情報1</h3>
            </div>
        `
    }
}

//Pythonのタイトル挿入
class PythonTitle extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="content_ttl">
                <h3>Python</h3>
            </div>
        `
    }
}

//VBAのタイトル挿入
class VBATitle extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="content_ttl">
                <h3>VBA</h3>
            </div>
        `
    }
}

customElements.define("basicknowledge-title", BasicKnowledgeTitle)
customElements.define("htmlcss-title", HtmlCssTitle)
customElements.define("java-title", JavaTitle)
customElements.define("javascript-title", JavascriptTitle)
customElements.define("information-title", InformationTitle)
customElements.define("python-title", PythonTitle)
customElements.define("vba-title", VBATitle)