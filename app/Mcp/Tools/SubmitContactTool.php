<?php

declare(strict_types=1);

namespace App\Mcp\Tools;

use App\Models\ContactMessage;
use Illuminate\Contracts\JsonSchema\JsonSchema;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Tool;

class SubmitContactTool extends Tool
{
    protected string $name = 'submit_contact_message';

    protected string $description = 'Submit a contact message programmatically to the database';

    /**
     * Get the tool's input schema.
     *
     * @param  \Illuminate\Contracts\JsonSchema\JsonSchema  $schema
     * @return array<string, \Illuminate\JsonSchema\Types\Type>
     */
    public function schema(JsonSchema $schema): array
    {
        return [
            'name' => $schema->string()->description('Sender full name')->required(),
            'email' => $schema->string()->description('Sender email address')->required(),
            'message' => $schema->string()->description('The message content')->required(),
        ];
    }

    /**
     * Handle the tool request.
     *
     * @param  \Laravel\Mcp\Request  $request
     * @return \Laravel\Mcp\Response
     */
    public function handle(Request $request): Response
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'message' => 'required|string',
        ]);

        $name = $request->get('name');
        $email = $request->get('email');
        $message = $request->get('message');

        try {
            $record = ContactMessage::create([
                'name' => $name,
                'email' => $email,
                'message' => $message,
            ]);
            $status = 'success';
            $details = 'Message stored successfully in database record ID: ' . $record->id;
        } catch (\Exception $e) {
            $status = 'error_saving_to_db';
            $details = 'Could not save message to database. Reason: ' . $e->getMessage() . '. Fallback: Logged details successfully.';
            info("MCP Contact Submission (Fallback Log): Name: $name, Email: $email, Msg: $message");
        }

        return Response::json([
            'status' => $status,
            'details' => $details,
            'received_data' => [
                'name' => $name,
                'email' => $email,
                'message' => $message,
            ],
        ]);
    }
}
