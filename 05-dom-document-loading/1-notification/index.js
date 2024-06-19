export default class NotificationMessage {

    constructor(message, options) {
        this.message = message;
        this.options = options || {};
        this.element = document.createElement('div');
        this.duration = this.options.duration || 0;
        this.type = this.options.type || 'success';
        this.timer = null;
        this.render();
      }
    
      render() {
        this.element.textContent = this.message;
        this.element.className = `notification ${this.type}`;
      }
    
      show(targetElement) {
        if (targetElement) {
          targetElement.appendChild(this.element);
        } else {
          document.body.appendChild(this.element);
        }
        this.timer = setTimeout(() => {
          this.remove();
        }, this.duration);
      }
    
      remove() {
        if (this.timer) {
          clearTimeout(this.timer);
        }
        if (this.element) {
          this.element.remove();
        }
      }
    
      destroy() {
        this.remove();
        this.element = null;
      }
}
