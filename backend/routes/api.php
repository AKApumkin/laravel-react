<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


// CONTROLLER IMPORTS
use App\Http\Controllers\AgentController;
use App\Http\Controllers\PropertyController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

/**
 * The /agents is used as a fake login. Laravel passport or another authentication system should 
 * be used to properly authenticate and as the system is headless, there will need to be a 
 * token/refresh system implemented. 
 */
Route::get('/agents', [AgentController::class, 'index']);

Route::get('/properties/{agent_id}', [PropertyController::class, 'index']);
Route::get('/property/{id}', [PropertyController::class, 'getSpecificProperty']);
Route::get('/property-city/{agent_id}', [PropertyController::class, 'getPropertyCity']);
Route::get('/property-city/{city}/{agent_id}', [PropertyController::class, 'searchPropertyCity']);
Route::post('/property', [PropertyController::class, 'updateProperty']);
Route::post('/property-search', [PropertyController::class, 'customSearch']);

Route::post('/csv-search', function () {
    
});





