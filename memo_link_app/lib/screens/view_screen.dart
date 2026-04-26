import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:intl/intl.dart';

import '../models/note.dart';
import 'home_screen.dart';

final noteProvider = FutureProvider.family<Note, String>((ref, shortId) async {
  final api = ref.read(apiServiceProvider);
  return api.getNoteByShortId(shortId);
});

class ViewScreen extends ConsumerWidget {
  const ViewScreen({super.key, required this.shortId});

  final String shortId;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final asyncNote = ref.watch(noteProvider(shortId));

    return Scaffold(
      appBar: AppBar(title: const Text('메모 보기')),
      body: asyncNote.when(
        data: (note) => Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('생성일: ${DateFormat('yyyy-MM-dd HH:mm').format(note.createdAt.toLocal())}'),
              const SizedBox(height: 12),
              Expanded(
                child: SingleChildScrollView(
                  child: SelectableText(
                    note.content,
                    style: Theme.of(context).textTheme.bodyLarge,
                  ),
                ),
              ),
              const SizedBox(height: 12),
              FilledButton.icon(
                onPressed: () async {
                  await Clipboard.setData(ClipboardData(text: note.content));
                  if (!context.mounted) return;
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('메모를 복사했습니다.')),
                  );
                },
                icon: const Icon(Icons.copy),
                label: const Text('복사하기'),
              ),
            ],
          ),
        ),
        error: (error, _) => Center(
          child: Text('오류: $error'),
        ),
        loading: () => const Center(child: CircularProgressIndicator()),
      ),
    );
  }
}
