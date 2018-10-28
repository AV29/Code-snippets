/**
 * @name log
 * A function to either output text into console in a usual way or in colorful way
 * @example
 * log('Some black text');
 * log.success('Some Green text');
 * log.failure('Some red text');
 * log.processing('Some blue text');
 */

const output = color => (...args) => console.log(`%c${args[0]}`, `color: ${color}`, ...args.slice(1));

function log(...args: any[]): void {
    return output('black')(args);
}

log["success"] = output('green');
log["failure"] = output('tomato');
log["processing"] = output('skyblue');
