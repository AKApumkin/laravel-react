<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class CSVDataController extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;
    // $csv = array_map('str_getcsv', file('data.csv'));
}
