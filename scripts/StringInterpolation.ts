namespace StringInterpolation {
    const translations = {
        'en': {
            headerTitle: '{{days}} days passed since {{name}} {{name}} {{name}} had came back',
            footerTitle: 'Text without interpolation'

        },
        'ru': {
            headerTitle: 'Прошло {{days}} дней с тех пор как {{name}} {{name}} {{name}} вернулся',
            footerTitle: 'Текст без интерполяции'
        }
    };

    const parse = (string, params) => {
        if (typeof params !== 'object' || Array.isArray(params)) {
            return string;
        }
        Object.keys(params).forEach(key => {
            string = string.replace(new RegExp(`{{${key}}}`, 'g'), params[key]);
        });
        return string;
    };

    const t = lang => (string, params = {}) => {
        const tlnString = translations[lang][string];
        return tlnString ? parse(tlnString, params) : string;
    };

    console.log(t('ru')('footerTitle'));
    console.log(t('ru')('headerTitle'));

    console.log(t('en')('footerTitle'));
    console.log(t('en')('headerTitle', {days: 2, name: 'Anton'}));
}
