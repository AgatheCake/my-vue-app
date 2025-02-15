import {describe, expect, it, vi} from 'vitest';
import axios from 'axios';

import {mount, flushPromises} from '@vue/test-utils';

import ScoreForm from '../ScoreForm.vue';
import Button from '../../components/Button.vue';
import ScoreInput from '../../components/ScoreInput.vue';
import ScoreCard from '../../components/ScoreCard.vue';

vi.mock('axios');

describe('ScoreForm.vue', () => {
    it('render properly the component', () => {
        const wrapper = mount(ScoreForm);

        expect(wrapper.text()).toContain('American Football');
        expect(wrapper.findComponent(Button).exists()).toBe(true);
        expect(wrapper.findComponent(ScoreInput).exists()).toBe(true);
    });

    it('fetch datas from API', async () => {
        const wrapper = mount(ScoreForm);

        wrapper.vm.form.score1 = 10;
        wrapper.vm.form.score2 = 9;

        const mockData = {
            team1: [
                'Touchdown + PAT + Field Goal',
                'Field Goal + Touchdown + PAT',
            ],
            team2: [
                'Touchdown + Field Goal',
                'Field Goal + Touchdown',
                'Field Goal + Field Goal + Field Goal',
            ],
        };

        axios.get.mockResolvedValue({
            data: mockData,
        });

        await wrapper.find('form').trigger('submit.prevent');
        await flushPromises();

        //test 1 : check API call

        expect(axios.get).toHaveBeenCalledWith(
            'http://localhost:3000/combinations?team1=10&team2=9',
        );

        expect(wrapper.vm.combinations).toEqual(mockData);

        // test 2 : check that ScoreCards are rendered with the API response

        const scoreCardTeam1 = wrapper.findAllComponents(ScoreCard).at(0);
        const scoreCardTeam2 = wrapper.findAllComponents(ScoreCard).at(1);

        expect(scoreCardTeam1.props()).toEqual({
            teamName: 'Team X ',
            score: 10,
            combinations: mockData.team1,
        });

        expect(scoreCardTeam2.props()).toEqual({
            teamName: 'Team Y',
            score: 9,
            combinations: mockData.team2,
        });
    });

    it('validates form data correctly', () => {
        const wrapper = mount(ScoreForm);

        // Scenario 1: Valid scores
        wrapper.vm.form.score1 = 10;
        wrapper.vm.form.score2 = 15;

        let hasError = wrapper.vm.validateFormData(
            wrapper.vm.form.score1,
            wrapper.vm.form.score2,
        );

        expect(hasError).toBe(false);
        expect(wrapper.vm.errors.errorMessage1).toBe('');
        expect(wrapper.vm.errors.errorMessage2).toBe('');

        // Scenario 2: Invalid score1 (non-integer)
        wrapper.vm.form.score1 = 'abc';
        wrapper.vm.form.score2 = 15;

        hasError = wrapper.vm.validateFormData(
            wrapper.vm.form.score1,
            wrapper.vm.form.score2,
        );

        expect(hasError).toBe(true);
        expect(wrapper.vm.errors.errorMessage1).toBe(
            'Le score doit être un nombre entier positif.',
        );
        expect(wrapper.vm.errors.errorMessage2).toBe('');

        // Scenario 3: Invalid score2 (negative number)
        wrapper.vm.form.score1 = 10;
        wrapper.vm.form.score2 = -5;

        hasError = wrapper.vm.validateFormData(
            wrapper.vm.form.score1,
            wrapper.vm.form.score2,
        );

        expect(hasError).toBe(true);
        expect(wrapper.vm.errors.errorMessage1).toBe('');
        expect(wrapper.vm.errors.errorMessage2).toBe(
            'Le score doit être un nombre entier positif.',
        );

        // Scenario 4: Invalid score1 (empty string)
        wrapper.vm.form.score1 = '';
        wrapper.vm.form.score2 = 15;

        hasError = wrapper.vm.validateFormData(
            wrapper.vm.form.score1,
            wrapper.vm.form.score2,
        );

        expect(hasError).toBe(true);
        expect(wrapper.vm.errors.errorMessage1).toBe(
            'Le score doit être un nombre entier positif.',
        );
        expect(wrapper.vm.errors.errorMessage2).toBe('');
    });
});
