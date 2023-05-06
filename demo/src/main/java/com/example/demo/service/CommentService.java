package com.example.demo.service;

import com.example.demo.entity.Comment;
import com.example.demo.entity.Order;
import com.example.demo.repository.CommentRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class CommentService {

    private final CommentRepository commentRepository;


    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    @GetMapping("/getComments")
    public ResponseEntity<List<Comment>> getComments() {
        List<Comment> commentList = commentRepository.findAll();
        return ResponseEntity.ok(commentList);
    }

    @PostMapping("/addComment")
    public ResponseEntity<?> addComment(@RequestBody Comment comment){
        commentRepository.save(comment);

        return  ResponseEntity.ok("Comment Added");
    }

    @DeleteMapping("/deleteComment/{id}")
    public ResponseEntity<Object> deleteComment(@PathVariable("id") Long id){

        commentRepository.deleteById(id);

        return new ResponseEntity<>("Comment Deleted", HttpStatus.OK);
    }

    @PutMapping("/editComment/{id}")
    public ResponseEntity<Object> editComment(@PathVariable("id") Long id, @RequestBody String body) {
        Optional<Comment> optionalComment = commentRepository.findById(id);

        if (optionalComment.isPresent()) {
            Comment comment = optionalComment.get();
            comment.setBody(body);
            commentRepository.save(comment);
            return ResponseEntity.ok("Comment edited");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
