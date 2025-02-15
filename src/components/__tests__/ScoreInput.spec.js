import {describe, expect, it} from 'vitest';

import {mount} from '@vue/test-utils';
import ScoreInput from '../ScoreInput.vue';
import {markRaw} from 'vue';

describe('ScoreInput.vue', () => {
    it('render properly the component', () => {
        //markRaw is used to have a non reactive object: to avoid warnings in the console while launching the test
        const wrapper = mount(ScoreInput, {
            props: {
                label: 'Combinations for team X',
                modelValue: 10,
                icon: markRaw({template: '<span class="icon-stub"></span>'}),
            },
        });

        expect(wrapper.find('.score-input__label').text()).toBe(
            'Combinations for team X',
        );

        expect(wrapper.find('.score-input__icon').exists()).toBe(true);
    });

    it('update and emit the event', async () => {
        const wrapper = mount(ScoreInput, {
            props: {label: 'Score', modelValue: 10},
        });

        const input = wrapper.find('input');
        await input.setValue(20);

        expect(wrapper.emitted()['update:modelValue']).toBeTruthy();
        expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['20']);
    });
});
