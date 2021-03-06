<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\User;

class UserController extends Controller
{
    private $status_code = 200;

    public function userRegister(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "name" => "required",
            "email" => "required|email",
            "password" => "required"
        ]);

        if ($validator->fails()) {
            return response()->json(["status" => "failed", "message" => "validation_error", "errors" => $validator->errors()]);
        }

        $userDataArray = array(
            "name" => $request->name,
            "email" => $request->email,
            "password" => bcrypt($request->password)
        );

        $user_status = User::where("email", $request->email)->first();

        if (!is_null($user_status)) {
            return response()->json(["status" => "failed", "success" => false, "message" => "¡Este correo ya ha sido registrado!"]);
        }

        $user = User::create($userDataArray);

        if (!is_null($user))
            if (!is_null($user)) {
                return response()->json(["status" => $this->status_code, "success" => true, "message" => "¡Usuario creado con éxito!", "data" => $user]);
            } else {
                return response()->json(["status" => "failed", "success" => false, "message" => "Error al registrar al usuario"]);
            }
    }

    public function userLogin(Request $request)
    {

        $validator = Validator::make(
            $request->all(),
            [
                "email" => "required|email",
                "password" => "required"
            ]
        );

        if ($validator->fails()) {
            return response()->json(["status" => "failed", "validation_error" => $validator->errors()]);
        }


        // check if entered email exists in db
        $email_status = User::where("email", $request->email)->first();

        // if email exists then we will check password for the same email
        if (!is_null($email_status)) {
            $password_status = User::where("email", $request->email)->where("password", bcrypt($request->password))->first();

            // if password is correct
            if (!is_null($password_status)) {
                $user = $this->userDetail($request->email);

                return response()->json(["status" => $this->status_code, "success" => true, "message" => "¡Sesión iniciada correctamente!", "data" => $user]);
            } else {
                return response()->json(["status" => "failed", "success" => false, "message" => "No se ha podido inicar sesión. Contraseña incorrecta"]);
            }
        } else {
            return response()->json(["status" => "failed", "success" => false, "message" => "No se ha podido iniciar sesión. El correo no existe"]);
        }
    }

    public function userDetail($email)
    {
        $user = array();
        if ($email != "") {
            $user = User::where("email", $email)->first();
            return $user;
        }
    }
}
