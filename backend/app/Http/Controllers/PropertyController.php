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

    public function getPropertyCity($agent_id) {
        $properties = Property::select("city")
                                ->where("agent_id","=",$agent_id)
                                ->distinct()
                                ->get();
        return $properties;
    }

    public function searchPropertyCity($city, $agent_id) {
        $properties = Property::select("id","address","city","postcode")
                                ->where([
                                    ["city","=",$city],
                                    ["agent_id","=",$agent_id]
                                ])
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
            "address"    => $request->address,
            "city"       => $request->city,
            "postcode"   => $request->postcode
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

    public function customSearch(Request $request)
    {
        $agent_id = $request->agent_id;

        // Get the unique values from the array of objects based on the object value called type
        $unique_values = $this->getUniqueValues($request->search);

        // Create a new array based off the unique values
        $unique_values_array = $this->createDynamicArray($unique_values);
        
        // Loop through the data and bind the city to the unique value
        // To Do if more time - remove the hardcoded City and pass in the header unique values from the JSON
        foreach($request->search as $key => $value) {
            foreach($value as $key => $item) {
                foreach ($unique_values as $key => $unique_value) {
                    if($item == $unique_value) {
                        array_push($unique_values_array[$unique_value], $value["City"]);
                    }
                }
            }
        }

        // Create return array with property data
        $return_array = $this->createDynamicArray($unique_values);
        
        // For each unqique search array get the required data and return as JSON
        foreach ($unique_values_array as $key => $value) {
                $properties = Property::select("id","address","city","postcode")
                                        ->whereIn("city", $value)
                                        ->where("agent_id","=",$agent_id)
                                        ->get();
                $return_array[$key] = $properties;
        }
        return response()->json($return_array);
    }

    /**
     * Get the unique values from the array of objects based on the object value called type
     * To Do if more time - remove the hardcoded type and pass in the header unique values from the JSON
     * @param array $array
     * @return array
     */
    private function getUniqueValues($array) {
        $unique_values = array();
        foreach($array as $key => $value) {
            foreach($value as $key => $item) {
                if($key == "Type") {
                    if(!in_array($item, $unique_values)) {
                        array_push($unique_values, $item);
                    }
                }
            }

        }
        return $unique_values;
    }

    /**
     * Creates a dynamic array structure for unique values
     * @param array $array
     * @return array
     */
    private function createDynamicArray($array) {
        $unique_values_array = array();
        foreach ($array as $key => $unique_value) {
            $unique_values_array[$unique_value] = array();
        }
        return $unique_values_array;
    }
}
