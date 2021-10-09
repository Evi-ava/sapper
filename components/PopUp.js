export default class PopUp {

    element = null;

    constructor() {
        this.render();
    }

    render() {
        const wrapper = document.createElement('div');

        wrapper.innerHTML = this.getTemplate();
        this.element = wrapper.firstElementChild;
    }

    getPopUp(time, bestTime, buttonText = 'Повторная игра') {
        const timeElem          = this.element.querySelector('.message-clock-counter');
        const bestTimeElement   = this.element.querySelector('.message-cup-counter');
        const buttonTextElement = this.element.querySelector('.message-btn__text');

        timeElem.innerHTML          = time;
        bestTimeElement.innerHTML   = bestTime;
        buttonTextElement.innerHTML = buttonText;

        console.log(timeElem)
        console.log(bestTimeElement)

        return this.element;
    }

    getTemplate() {
        return `
                <div class="message-wrapper">
                    <div class="message">
                        <div class="message-info message__message-info">
                            <div class="message-clock">
                                <img src="svg/clock.svg" alt="clock">
                                <span class="message-info__text message-clock-counter"></span>
                            </div>
                            <div class="message-cup">
                                <img src="svg/cup.svg" alt="cup">
                                <span class="message-info__text message-cup-counter"></span>
                            </div>
                        </div>
                        <button data-restart="true" class="message-btn"> <span class="message-btn__text"></span></button>
                    </div>
                </div>
        `;
    }

    remove() {
        this.element.remove();
    }
}