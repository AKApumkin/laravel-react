<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use App\Models\Agent;

class AgentController extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    /**
     * return a JSON of the agents with id and name.
     * @return JSON
     */
    public function index() 
    {
        $agents = Agent::select('id','name')->get();
        return $agents;
    }
}
