<?php

namespace App\Modules\Administration\Models;

use App\Models\User;
use App\Modules\Administration\database\factories\EmployeeFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Employee extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = [];
    protected $table = 'employees';
    protected $with = ['user']; // Carrega automaticamente

    public function casts(): array
    {
        return [
            'hire_date' => 'date',
            'termination_date' => 'date',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function teams(): BelongsToMany
    {
        return $this->belongsToMany(Team::class, 'employee_team');
    }

    public static function factory(): EmployeeFactory
    {
        return EmployeeFactory::new();
    }
}
