import {describe, expect, it} from 'vitest';

import {mount} from '@vue/test-utils';
import ScoreCard from '../ScoreCard.vue';

describe('ScoreCard.vue', () => {
    it('render properly the component', async () => {
        const wrapper = mount(ScoreCard, {
            props: {
                teamName: 'Team X',
                score: 10,
                combinations: ['combination1', 'combination2'],
            },
        });

        expect(wrapper.text()).toContain(
            'Combinations for Team X with 10 points:',
        );
    });

    it('display the list of combinations if not empty', () => {
        const wrapper = mount(ScoreCard, {
            props: {
                teamName: 'Team X',
                score: 10,
                combinations: ['combination1', 'combination2'],
            },
        });

        const listItems = wrapper.findAll('li');
        expect(listItems).toHaveLength(2);
        expect(listItems[0].text()).toBe('combination1');
        expect(listItems[1].text()).toBe('combination2');
    });

    it('does NOT display the list of combinations if empty', () => {
        const wrapper = mount(ScoreCard, {
            props: {
                teamName: 'Team X',
                score: 10,
                combinations: [],
            },
        });

        expect(wrapper.find('.card-score').exists()).toBe(false);
    });
});
