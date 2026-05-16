import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class ResultScreen extends StatelessWidget {
  const ResultScreen({super.key, required this.shortId, required this.url});

  final String shortId;
  final String url;

  Future<void> _copyToClipboard(BuildContext context) async {
    await Clipboard.setData(ClipboardData(text: url));
    if (!context.mounted) return;

    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('링크가 복사되었습니다.')),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('링크 생성 완료')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('short_id: $shortId', style: Theme.of(context).textTheme.titleMedium),
            const SizedBox(height: 12),
            SelectableText(url, style: Theme.of(context).textTheme.bodyLarge),
            const SizedBox(height: 20),
            FilledButton.icon(
              onPressed: () => _copyToClipboard(context),
              icon: const Icon(Icons.copy),
              label: const Text('복사하기'),
            ),
          ],
        ),
      ),
    );
  }
}
