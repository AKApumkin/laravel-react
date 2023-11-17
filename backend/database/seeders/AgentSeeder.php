<?php

namespace Database\Seeders;

use App\Models\Agent;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AgentSeeder extends Seeder
{
    protected $agentNames = [
        'Premier Property Partners',
        'London Luxury Estates',
        'Elite Homes Realty',
        'Royal City Properties',
        'Graceful Gardens Estates',
        'Prime Residence Agents',
        'Heritage Homes Consultants',
        'Regal Realty Solutions',
        'Crowned Castle Estates',
        'Manor House Brokers',
        'Signature Properties UK',
        'Britannia Dream Homes',
        'Knightsbridge Estates',
        'Ivy Lane Real Estate',
        'Mayfair Mansion Agents',
        'Tudor Terrace Properties',
        'Knights & Queens Estates',
        'Riverside Retreats UK',
        'Castlekeep Realty',
        'Golden Key Homes'
    ];

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach ($this->agentNames as $agentName) {
            Agent::create([
                'name' => $agentName
            ]);
        }
    }
}
