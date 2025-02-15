import {describe, expect, it, vi} from 'vitest';

import {mount} from '@vue/test-utils';
import Button from '../Button.vue';

describe('Button.vue', () => {
    it('render properly the component', () => {
        const wrapper = mount(Button, {
            props: {
                label: 'Get Possibilities',
            },
        });

        expect(wrapper.find('.btn').text()).toBe('Get Possibilities');
    });

    it('emits click event when clicked', async () => {
        const wrapper = mount(Button, {
            props: {
                label: 'Click Me',
            },
        });

        await wrapper.find('button').trigger('click');

        const emitted = wrapper.emitted();
        expect(emitted.click).toBeTruthy();
    });
});
