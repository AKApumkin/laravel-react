<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class PropertyAPITest extends TestCase
{
    /**
     * Get all properties for an agent
     * @return void
     */
    public function test_get_properties(): void
    {
        $response = $this->getJson("/api/properties/1");
        $response->assertStatus(200);
        $response->assertJsonStructure([
            "data" => [
                0 => [
                    "id",
                    "address",
                    "city",
                    "postcode"
                ]
            ]
        ]);
    }

    /**
     * Get a sepecfic property for an agent
     * @return void
     */
    public function test_get_specific_property(): void
    {
        $response = $this->getJson("/api/property/1");
        $response->assertStatus(200);
        $response->assertJsonStructure([
            "data" => [
                "id",
                "address",
                "city",
                "postcode"
            ]
        ]);
    }

    /**
     * Get distinct cities that an agent has properties in
     */
    public function test_get_distinct_cities(): void
    {
        $response = $this->getJson("/api/property-city/1");
        $response->assertStatus(200);
        $response->assertJsonStructure([
            "data" => [
                0 => [
                    "city",
                ]
            ]
        ]);
    }

    /**
     * Get all properties for an agent in a specific city
     */
    public function test_get_properties_in_city(): void
    {
        $response = $this->getJson("/api/property-city/Brightwick/1");
        $response->assertStatus(200);
        $response->assertJsonStructure([
            "data" => [
                0 => [
                    "id",
                    "address",
                    "city",
                    "postcode"
                ]
            ]
        ]);
    }

    /**
     * Update a sepific property for an agent
     */
    public function test_update_a_property(): void
    {
        $response = $this->withHeaders([
            "Content-Type" => "application/json"
        ])->put("/api/property", 
        [
            "id"      => "1",
            "address" => "25318 Harvey Radial Apt. 654",
            "city"    => "Brightwick",
            "postcode"=> "46857"
        ]);

        $this->assertThat(
            $response->getStatusCode(),
            $this->logicalOr(
                $this->equalTo(200),
                $this->equalTo(418)
            )
        );
 
        $response->assertJsonStructure([
            "message"
        ]);
    }

    /**
     * Search for properties based on a dynamic search
     */
    public function test_custom_search(): void
    {
        $response = $this->withHeaders([
            "Content-Type" => "application/json"
        ])->post("/api/property-search", 
        [
            "agent_id" => "1",
            "search"   => [
                "City"  => "Brightwick",
                "Type" => "mandatory"
            ]
        ]);

        $payload = [
            "agent_id" => "1",
            "search"   => [
                0 => [
                    "City"  => "Brightwick",
                    "Type" => "mandatory"
                ],
                1 => [
                    "City"  => "Maplewood",
                    "Type" => "selective"
                ]
            ]
        ];

        $response = $this->postJson(
            "/api/property-search", $payload, ["Content-Type" => "application/json"]
        );

        $response->assertStatus(200);
        $response->assertJsonStructure([
            0 => [
                "unique_name",
                "properties" => [
                    0 => [
                        "id",
                        "address",
                        "city",
                        "postcode"
                    ]
                ]
            ]
        ]);
    }
}
