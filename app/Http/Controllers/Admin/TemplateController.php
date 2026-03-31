<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Template;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class TemplateController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Templates/Index', [
            'templates' => Template::latest()->paginate(10),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Templates/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string',
            'description' => 'nullable|string',
            'thumbnail' => 'nullable|string',
            'preview_url' => 'nullable|url',
            'default_settings' => 'nullable|array',
            'is_active' => 'required|boolean',
        ]);

        $validated['slug'] = Str::slug($validated['name']);
        Template::create($validated);

        return redirect()->route('templates.index')->with('success', 'Template berhasil ditambahkan.');
    }

    public function edit(Template $template)
    {
        return Inertia::render('Admin/Templates/Edit', [
            'template' => $template
        ]);
    }

    public function update(Request $request, Template $template)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string',
            'description' => 'nullable|string',
            'thumbnail' => 'nullable|string',
            'preview_url' => 'nullable|url',
            'default_settings' => 'nullable|array',
            'is_active' => 'required|boolean',
        ]);

        if ($template->name !== $validated['name']) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        $template->update($validated);

        return redirect()->route('templates.index')->with('success', 'Template berhasil diperbarui.');
    }

    public function destroy(Template $template)
    {
        if ($template->invitations()->exists()) {
            return back()->withErrors(['error' => 'Template tidak bisa dihapus karena sudah digunakan oleh project aktif.']);
        }

        $template->delete();
        return redirect()->route('templates.index')->with('success', 'Template berhasil dihapus.');
    }
}
