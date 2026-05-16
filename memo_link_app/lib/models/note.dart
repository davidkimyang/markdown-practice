class Note {
  final String id;
  final String shortId;
  final String content;
  final DateTime createdAt;
  final DateTime? expiresAt;

  const Note({
    required this.id,
    required this.shortId,
    required this.content,
    required this.createdAt,
    this.expiresAt,
  });

  factory Note.fromJson(Map<String, dynamic> json) {
    return Note(
      id: json['id'] as String,
      shortId: json['short_id'] as String,
      content: json['content'] as String,
      createdAt: DateTime.parse(json['created_at'] as String),
      expiresAt: json['expires_at'] == null
          ? null
          : DateTime.parse(json['expires_at'] as String),
    );
  }
}
