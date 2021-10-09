export default class Header {

    element = null;

    flagCounterElement = null;
    amountFlags = 0;

    clockElement = null;
    clockCount = 0;

    intervalId = null;

    constructor(amountBombs = 0) {
        this.amountFlags = amountBombs;
        this.render();
    }

    render() {
        const wrapper = document.createElement('div');

        wrapper.innerHTML = this.template;

        this.element = wrapper.firstElementChild;
        this.flagCounterElement = this.element.querySelector('.flag-count');
        this.clockElement = this.element.querySelector('.clock-count');

        this.flagCounterElement.innerHTML = this.amountFlags;
        this.clockElement.innerHTML = this.clockCount;

    }

    update(amountBombs = 0) {
         this.amountFlags = amountBombs;
         this.clockCount = 0;
         this.clockElement.innerHTML = 0;
         this.flagCounterElement.innerHTML = this.amountFlags;
    }

    lose() {
        this.removeClock();
    }

    handlerFlag(action) {
        switch (action) {
            case 'add':
                this.amountFlags++;
                this.flagCounterElement.innerHTML = this.amountFlags;
                break;
            case 'delete':
                this.amountFlags--;
                this.flagCounterElement.innerHTML = this.amountFlags;
        }
    }

    clock() {
        this.clockCount++;
        this.clockElement.innerHTML = this.clockCount;
    }

    startClock(context) {
        this.intervalId = setInterval(this.clock.bind(context), 1000);
    }

    removeClock() {
        clearInterval(this.intervalId);
    }

    get template() {
        return `
             <header class="header">
                <select size="1" class="select">
                    <option value="simple">Простой</option>
                    <option value="middle">Средний</option>
                    <option value="hard">Сложный</option>
                </select>

                <div class="info-block">
                    <div class="flag-block">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.09677 20H0V18.3871L0.322581 18.0645L1.93548 16.7742V16.4516V0L20 5.16129V5.80645L5.16129 11.2903V16.7742L7.09677 18.0645V20Z" fill="#E63307"/>
                            <path d="M5.16129 0.967743V11.2903L20 5.80645V5.16129L5.16129 0.967743Z" fill="#F23607"/>
                        </svg>
                        <p class="flag-count">000</p>
                    </div>
                    <div class="clock-block">
                        <svg width="29" height="32" viewBox="0 0 29 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <ellipse cx="14.5" cy="18.4243" rx="14.5" ry="13.5758" fill="#FDBE02"/>
                            <g filter="url(#filter0_i)">
                                <ellipse rx="10.2617" ry="9.7979" transform="matrix(0.931282 -0.364299 0.40752 0.913196 14.5 18.4243)" fill="#F1F1F1"/>
                            </g>
                            <line x1="13.9643" y1="13.5758" x2="13.9643" y2="19.394" stroke="#353535"/>
                            <line y1="-0.5" x2="8.51285" y2="-0.5" transform="matrix(-0.729989 0.683459 -0.729989 -0.683459 19.6786 13.5758)" stroke="#353535"/>
                            <path d="M17.0893 3.87879V5.81818H10.875V3.87879L8.28571 3.39394V1.45454L10.3571 0H17.6071L19.6786 0.969696V3.39394L17.0893 3.87879Z" fill="#FDBE02"/>
                            <defs>
                                <filter id="filter0_i" x="4.14017" y="8.72473" width="20.7197" height="20.399" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                    <feOffset dy="1"/>
                                    <feGaussianBlur stdDeviation="1"/>
                                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                                    <feBlend mode="normal" in2="shape" result="effect1_innerShadow"/>
                                </filter>
                            </defs>
                        </svg>
                        <p class="clock-count">000</p>
                    </div>
                </div>

                <div class="exit" data-restart="true">
                    <svg version="1.1" id="reload" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
\t width="102.455px" height="102.455px" viewBox="0 0 102.455 102.455" style="enable-background:new 0 0 102.455 102.455;"
\t xml:space="preserve">
<g>
\t<g>
\t\t<path d="M61.977,17.156L48.277,30.855c-0.789,0.79-2.074,0.79-2.866,0l-0.197-0.202V20.568
\t\t\tc-16.543,1.156-29.65,14.975-29.65,31.806c0,11.82,6.487,22.617,16.937,28.175c2.631,1.402,3.631,4.671,2.233,7.31
\t\t\tc-1.403,2.635-4.671,3.634-7.306,2.231c-13.983-7.44-22.67-21.889-22.67-37.716c0-22.792,17.953-41.47,40.457-42.641V0.792
\t\t\tl0.197-0.199c0.792-0.79,2.077-0.79,2.866,0l13.699,13.696C62.771,15.083,62.771,16.369,61.977,17.156z"/>
\t\t<path d="M54.174,101.861L40.477,88.166c-0.792-0.79-0.792-2.074,0-2.864l13.697-13.695c0.791-0.794,2.074-0.794,2.868,0
\t\t\tl0.191,0.198l0.007,10.082C73.776,80.733,86.89,66.918,86.89,50.084c0-11.82-6.491-22.614-16.939-28.175
\t\t\tc-2.635-1.4-3.635-4.675-2.234-7.31c1.406-2.635,4.678-3.634,7.312-2.231c13.979,7.44,22.669,21.892,22.669,37.716
\t\t\tc0,22.794-17.953,41.469-40.457,42.636v8.942l-0.198,0.198C56.248,102.652,54.965,102.652,54.174,101.861z"/>
\t</g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>
                </div>
            </header>
        `;
    }

}