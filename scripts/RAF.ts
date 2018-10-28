/**
 * @name go (Request Animation Frame example)
 * @example
 * go({
        duration: 1000,
        timing: function (timeFraction) {
            return timeFraction;
        },
        draw: function (progress) {
            const offset = progress * 100;
            if (offset > 100 - 5) return;
            elem.style.left = progress * 100 + '%';
        }
    })
 */

function go(options) {

    const start = performance.now();

    requestAnimationFrame(function animate(time) {
        let timeFraction = (time - start) / options.duration;
        if (timeFraction > 1) timeFraction = 1;

        const progress = options.timing(timeFraction);

        options.draw(progress);

        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        }

    });
}