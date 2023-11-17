<?php

namespace Database\Factories;

use App\Models\Agent;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Property>
 */
class PropertyFactory extends Factory
{
    protected $cities = array(
        'AW' => 'Amberwick',
        'BB' => 'Bellebrook',
        'BF' => 'Birchfield',
        'BW' => 'Bramblewick',
        'BX' => 'Briarwood',
        'BV' => 'Brightvale',
        'BQ' => 'Brightwick',
        'BS' => 'Brookshire',
        'DF' => 'Dawnford',
        'EB' => 'Elmbrook',
        'ED' => 'Emberdale',
        'FD' => 'Fairdale',
        'FV' => 'Fairview',
        'FB' => 'Falconbridge',
        'FE' => 'Fernville',
        'GW' => 'Glenwood',
        'GF' => 'Greenfield',
        'GD' => 'Greendale',
        'HF' => 'Hartford',
        'HL' => 'Hartland',
        'HH' => 'Harthaven',
        'HB' => 'Havenbridge',
        'HV' => 'Hazelvale',
        'HZ' => 'Hazelwood',
        'HD' => 'Hollowdale',
        'LV' => 'Lakeville',
        'LK' => 'Lakewood',
        'MW' => 'Maplewood',
        'MB' => 'Meadowbrook',
        'MI' => 'Mistchester',
        'MF' => 'Moorfield',
        'MC' => 'Moonchester',
        'MO' => 'Mossborough',
        'OS' => 'Oakshire',
        'RD' => 'Riverdale',
        'RM' => 'Rivermere',
        'RL' => 'Roseland',
        'SB' => 'Silverbrook',
        'SF' => 'Silverfield',
        'SV' => 'Springville',
        'SM' => 'Stonemeadow',
        'ST' => 'Stoneville',
        'WB' => 'Westbrook',
        'WR' => 'Westerfield',
        'WL' => 'Westerleigh',
        'WF' => 'Westfield',
        'WI' => 'Willowbrook',
        'WG' => 'Willowgate',
        'WM' => 'Woodmere',
    );


    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $key = Arr::random(array_keys($this->cities));
        $city = $this->cities[$key];

        // Create a fake postcode for the city
        $postcode = preg_replace(
            '/^([^0-9]+)/',
            Str::substr($key, 0, Str::length('$1')),
            fake()->postcode()
        );

        return [
            'address' => fake()->streetAddress(),
            'city' => $city,
            'postcode' => $postcode,
            'agent_id' => Agent::all()->random()->id,
        ];
    }
}
