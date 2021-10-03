export default class Header {

    element = null;

    flagCounterElement = null;
    amountFlags = 0;

    clockElement = null;
    clockCount = 0;


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
        setInterval(this.clock.bind(context), 1000);
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

                <div class="exit">
                    &#215
                </div>
            </header>
        `;
    }

}