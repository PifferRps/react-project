<?php

namespace App\Modules\Administration\Models;

use App\Modules\Administration\database\factories\EmployeeFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Indicator extends Model
{
    use HasFactory, softDeletes;

    protected $guarded = [];
    protected $table = 'indicators';

    public function employees(): BelongsToMany
    {
        return $this->belongsToMany(Employee::class, 'employee_team');
    }

    public static function factory(): EmployeeFactory
    {
        return EmployeeFactory::new();
    }
}
