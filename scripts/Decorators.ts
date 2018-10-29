const logger: Function = (extraParameter: any): MethodDecorator =>
    (target: Object,
     name: string,
     descriptor: PropertyDescriptor): PropertyDescriptor => {
        const original = descriptor.value;
        if (typeof original === 'function') {
            descriptor.value = function (...args: any[]) {
                console.log(`Extra param in ${name}: ${extraParameter}`);
                const result = original.call(this, ...args);
                console.log('Result is ', result);
                return result;
            }
        }
        return descriptor;
    };

const test: Function = (extraParameter: any): MethodDecorator =>
    (target: Object,
     name: string,
     descriptor: PropertyDescriptor): PropertyDescriptor => {
        console.log(`Extra param in ${name}: ${extraParameter}`);
        return descriptor;
    };

function classDecorator(Class: Function): void {
    console.log('Constructor data: ', Class);
}

@classDecorator
class Example {

    constructor(name?, age?) {
        console.log('In constructor itself! ', name, age);
    }

    @test(129)
    public static sum(a: number, b: number): number {
        console.log('Inside function itself ');
        return a + b;
    }

    @logger('Anton')
    public unlimitedArgsSum(...args: number[]): number {
        console.log('Inside function itself ');
        return args.reduce((result, arg) => result + arg, 0);
    }
}

const e = new Example('Anton', 30);

//Example.sum(1, 2);

console.log('---------------------------------------');

//Example.unlimitedArgsSum(1, 2, 3, 4, 5, 6);