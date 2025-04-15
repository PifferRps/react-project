<?php

namespace App\Modules\Administration\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class IndicatorsRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'weight' => 'required|numeric',
        ];
    }
}
