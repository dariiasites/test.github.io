import os

SCRIPT_TAG = '<script async src="https://127.0.0.1:18003/api/v1/projects/uicue/sdk.js?siteKey=project_44" data-project-id="44"></script>'

# Список всех HTML-файлов
HTML_FILES = [
    'index.html',
    'catalog.html',
    'product.html',
    'cart.html',
    'checkout.html',
    'about.html',
    'contacts.html'
]

for filename in HTML_FILES:
    if not os.path.exists(filename):
        print(f'⚠️  Файл не найден: {filename}')
        continue
    
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Проверяем, не вставлен ли уже скрипт
    if 'uicue/sdk.js' in content:
        print(f'⏭️  {filename}: скрипт уже есть, пропускаем')
        continue
    
    # Вставляем перед </head>
    if '</head>' in content:
        new_content = content.replace('</head>', f'  {SCRIPT_TAG}\n</head>')
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f'✅ {filename}: скрипт добавлен')
    else:
        print(f'❌ {filename}: не найден тег </head>')

print('\n🎉 Готово!')
