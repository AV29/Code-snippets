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

function classLogger<T extends Function>(Target: any): any {
    const newCtor = function (...args): any {
        console.log('Before constructor');
        const res = new Target(...args);
        console.log('after constructor');
        return res;
    };
    newCtor.prototype = Object.create(Target.prototype);
    newCtor.prototype.constructor = Target;

    return newCtor;
}

function AddFunctionThatDisplaysTextDecorator(methodName: string, someText: string): ClassDecorator {
    return (constructor: Function) => {
        console.log(`Adding with ${someText}`);
        constructor.prototype[methodName] = function() {console.log(someText)}
    }
}

@AddFunctionThatDisplaysTextDecorator('add1', 'Anton')
@AddFunctionThatDisplaysTextDecorator('add2', 'Vlasik')
//@Singletonize
@classLogger
class Example {

    constructor(name?, age?) {
        console.log('In constructor itself! ', name, age);
    }

    //@test(129)
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
const f = new Example('Anton', 29);
console.log(e);

//Example.sum(1, 2);

console.log('---------------------------------------');

//Example.unlimitedArgsSum(1, 2, 3, 4, 5, 6);