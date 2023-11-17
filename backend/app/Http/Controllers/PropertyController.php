<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;
use App\Models\Property;


class PropertyController extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    public function index($agent_id)
    {
        $properties = Property::select("id","address","city","postcode")
                            ->where("agent_id","=",$agent_id)
                            ->paginate(10);
        return $properties;
    }

    public function getSpecificProperty($property_id)
    {
        $property = Property::find($property_id);
        return $property;
    }

    public function updateProperty(Request $request)
    {
        $property_update = Property::where("id","=",$request->id)->update([
            "address" => $request->address,
            "city" => $request->city,
            "postcode" => $request->postcode
        ]);
        if($property_update) {
            return response()->json([
                "message" => "Property updated successfully"
            ], 200);
        } else {
            return response()->json([
                "message" => "Property error"
            ], 418);
        }
    }
}
