import IPA, { or, From, Integer, assemble } from 'ipa.js';

const dateStr = (compile) => ({
    check: (v) => {
        if (!compile(String).check(v)) return false;
        return Boolean(+new Date(v));
    },
    guarantee(v) {
        return this.check(v) ? v : '';
    },
});

IPA.inject('looseStr', or(String, From(undefined)));
IPA.inject('dateStr', dateStr);
IPA.inject('looseDateStr', assemble(or(dateStr, From(undefined)), dateStr));
IPA.inject('encodeTypeArr', (compile) => ({
    check: (v) => v === undefined || (compile(String).check(v) && compile([From('0', '1', '2', '3', '4')]).check(v.split(','))),
    guarantee(v) {
        return this.check(v) ? v && v.split(',').map(i => +i) : undefined;
    }
}));
