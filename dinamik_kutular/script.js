const BOX_SIZE = 100;
const PADDING = 10;

const canvas = document.getElementById('canvas');
const clearBoxesButton = document.getElementById('clearBoxes');

let boxes = [];

class Box {
    constructor(id) {
        this.id = id;
        this.element = document.createElement('div');
        this.element.className = 'box';
        this.element.textContent = id;
        canvas.appendChild(this.element);
    }

    setPosition(x, y) {
        this.element.style.left = `${x}px`;
        this.element.style.top = `${y}px`;
    }

    remove() {
        if (this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
    }
}

function repositionBoxes() {
    const canvasWidth = canvas.clientWidth;
    const boxWithPadding = BOX_SIZE + PADDING;

    const boxesPerRow = Math.max(1, Math.floor(canvasWidth / boxWithPadding));

    let maxRowHeight = 0;

    boxes.forEach((box, index) => {
        const col = index % boxesPerRow;
        const row = Math.floor(index / boxesPerRow);

        const x = col * boxWithPadding;
        const y = row * boxWithPadding;

        box.setPosition(x, y);

        maxRowHeight = Math.max(maxRowHeight, y + BOX_SIZE + PADDING);
    });

    canvas.style.height = `${boxes.length === 0 ? 200 : maxRowHeight}px`;
}

canvas.addEventListener('click', (event) => {
    if (event.target === canvas) {
        const newBoxId = boxes.length + 1;
        const newBox = new Box(newBoxId);
        boxes.push(newBox);
        repositionBoxes();
    }
});

window.addEventListener('resize', repositionBoxes);

clearBoxesButton.addEventListener('click', () => {
    boxes.forEach(box => box.remove());
    boxes = [];
    repositionBoxes();
});

window.onload = repositionBoxes;